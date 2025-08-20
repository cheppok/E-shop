// import { useEffect, RefObject } from 'react';

// const useClickOutside = (
// 	ref: RefObject<HTMLElement>,
// 	handler: (event: MouseEvent | TouchEvent) => void
// ) => {
// 	useEffect(() => {
// 		const listener = (event: MouseEvent | TouchEvent) => {
// 			if (!ref.current || ref.current.contains(event.target as Node)) {
// 				return;
// 			}
// 			handler(event);
// 		};

// 		document.addEventListener('mousedown', listener);
// 		document.addEventListener('touchstart', listener);

// 		return () => {
// 			document.removeEventListener('mousedown', listener);
// 			document.removeEventListener('touchstart', listener);
// 		};
// 	}, [ref, handler]);
// };

// export default useClickOutside;

// import { useEffect, RefObject } from 'react';

// const useClickOutside = (
// 	refs: RefObject<HTMLElement>[],
// 	handler: (event: MouseEvent | TouchEvent) => void
// ) => {
// 	useEffect(() => {
// 		const listener = (event: MouseEvent | TouchEvent) => {
// 			const isInside = refs.some(
// 				(ref) =>
// 					ref.current && ref.current.contains(event.target as Node)
// 			);
// 			if (!isInside) {
// 				handler(event);
// 			}
// 		};

// 		document.addEventListener("mousedown", listener);
// 		document.addEventListener("touchstart", listener);

// 		return () => {
// 			document.removeEventListener("mousedown", listener);
// 			document.removeEventListener("touchstart", listener);
// 		};
// 	}, [refs, handler]);
// };


// export default useClickOutside;
// hooks/useClickOutside.ts
// hooks/useClickOutside.ts
import { useEffect, RefObject } from 'react';

const useClickOutside = (
	ref: RefObject<HTMLElement>,
	handler: (event: MouseEvent | TouchEvent) => void
) => {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			// Ignore if ref is missing or the click was inside it
			if (!ref.current || ref.current.contains(event.target as Node)) {
				return;
			}

			// ✅ Ignore clicks on the scrollbar (right side of the window)
			if (event instanceof MouseEvent) {
				const { clientX } = event;
				const { clientY } = event;  //added by me
				const { innerWidth } = window;
				const { innerHeight } = window;  //added by me

				// 20px is a rough scrollbar width, adjust if needed
				if (clientX >= innerWidth - 20 || clientY >= innerHeight - 2000) {
					return;
				}
			
			}

			handler(event);
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [ref, handler]);
};

export default useClickOutside;
