// import { useRef, useState } from "react";

// const useLoadMore = (total: number) => {
//   const pageSize = 10;

//   const [start, setStart] = useState(0);
//   const [end, setEnd] = useState(pageSize);

//   const lastScrollTop = useRef(0);

//   const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
//     const el = e.currentTarget;
//     const currentScrollTop = el.scrollTop;

//     const isBottom =
//       currentScrollTop + el.clientHeight >= el.scrollHeight - 20;

//     const isTop = currentScrollTop <= 10;

//     // 🔽 Scroll Down
//     if (currentScrollTop > lastScrollTop.current) {
//       if (isBottom && end < total) {
//         setStart((prev) => prev + pageSize);
//         setEnd((prev) => prev + pageSize);
//       }
//     }

//     // 🔼 Scroll Up
//     else {
//       if (isTop && start > 0) {
//         setStart((prev) => Math.max(0, prev - pageSize));
//         setEnd((prev) => prev - pageSize);
//       }
//     }

//     lastScrollTop.current = currentScrollTop;
//   };

//   return { start, end, handleScroll };
// };

// export default useLoadMore;