
// import { authOptions } from '../app/api/auth/[...nextauth]/route';
// import getServerSession from "next-auth"
// import { prisma } from '../app/prisma/prisma';


// export async function getSesion() {

//  return   await getServerSession(authOptions)
    
// }                                          //this will get the ssession.

// export async function getCurrentUser() {
//     try {
//         const Session = await getSesion()
//         if (!Session?.user?.email) {
//             return null
            
//         } 
//         const currentUser = await prisma.user.findUnique({
//             where:{
//                 email: Session?.user?.email
//             }
//         })
//         if(!currentUser){return null}
//         return {
//             ...currentUser,
//             createdAt: currentUser.createdAt.toISOString(),
//             updatedAt: currentUser.updatedAt.toISOString(),
//             emailVerified: currentUser.emailVerified?.toISOString() || null
//         }
        
//     } catch (error) {
//            console.error('Error fetching current user:', error);
        
//     }
    
// }


import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { prisma } from "../app/prisma/prisma";
import { SafeUser } from '../app/types/index';

export async function getCurrentUser(): Promise<SafeUser | null> {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.email) return null;

		const currentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email,
			},
		});

		if (!currentUser) return null;

		// return SafeUser version
		return {
			...currentUser,
			createdAt: currentUser.createdAt.toISOString(),
			updatedAt: currentUser.updatedAt.toISOString(),
			emailVerified: currentUser.emailVerified?.toISOString() || null,
		};
	} catch (error) {
		console.error("Error in getCurrentUser:", error);
		return null;
	}
}
