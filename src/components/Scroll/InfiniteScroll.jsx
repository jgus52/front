import { useCallback, useRef } from "react";

function InfiniteScroll({ datas, scrollOptions, setScrollOptions }) {
  const fullContent = useRef();
  const childContent = useRef();
  
  const onScroll = useCallback(
    (e) => {
      const scrollAreaHeight = fullContent.current.clientHeight; 
      const myScroll = e.target.scrollTop + scrollAreaHeight; 
      const childHeight = childContent.current.clientHeight; 
      scrollOptions.fullHeight = e.nativeEvent.target.scrollHeight;

      const showMoreData = () => {
          setScrollOptions({ ...scrollOptions,
          childLength : scrollOptions.childLength + 30,
          fullHeight : childHeight * scrollOptions.childLength
        })
      }

      myScroll === scrollOptions.fullHeight && showMoreData(); 
    }, [scrollOptions, setScrollOptions]
  )

  return (
    <div className="scroll-container" onScroll={onScroll} ref={fullContent}>
      {datas?.map((data, index) => (
        <div key={index} className="content-contaienr" ref={childContent}>
          <div className="hash-list-components">
            <span className="hash-site">{data.hashsite}</span>
            <span className="hash">{data.hash}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InfiniteScroll;