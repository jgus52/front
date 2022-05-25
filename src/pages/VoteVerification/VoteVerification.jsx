import { useEffect, useState } from "react";
import Block from '../../components/Block/Block'
import InfiniteScroll from '../../components/Scroll/InfiniteScroll'

const VoteVerification = () => {

    const testhashlist = [
        {id:1, hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE1", hash: "1QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:2,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE2", hash: "2QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:3,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE3", hash: "3QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:4,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE4", hash: "4QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:5,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE5", hash: "5QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:6,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE6", hash: "6QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:7,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE7", hash: "7QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:8,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE8", hash: "8QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:9,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE9", hash: "9QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:10,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE10", hash: "10QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:11,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE11", hash: "11QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:12,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE12", hash: "12QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:13,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE13", hash: "13QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:14,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE14", hash: "14QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:15,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE15", hash: "15QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:16,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE16", hash: "16QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:17,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE17", hash: "17QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:18,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE18", hash: "18QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:19,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE19", hash: "19QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:20,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE20", hash: "20QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:21,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE21", hash: "21QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:22,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE22", hash: "22QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:23,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE23", hash: "23QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:24,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE24", hash: "24QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:25,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE25", hash: "25QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:26,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE26", hash: "26QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:27,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE27", hash: "27QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:28,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE28", hash: "28QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:29,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE29", hash: "29QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
        {id:30,hashsite: "https://ipfs.io/ipfs/QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUFWotWEmKJscHFxE30", hash: "30QmTDfwTbTkq8k36wPcpAaJWKgUkdmfUF" },
    ]

    const [datas, setDatas] = useState([]);
    const [scrollOptions, setScrollOptions] = useState({
        childLength: 30, 
        fullHeight: 0, 
    });

    useEffect(() => {
        setDatas(testhashlist.slice(0, scrollOptions.childLength));
      }, [testhashlist, scrollOptions.childLength]);
    
    
    return (
            <div>
                <div className="election-title">
                    <p className="hash-site">전체 합산 해쉬 주소</p>
                    <p className="hash-site-sub">(해당 투표의 모든 암호문을 동형 알고리즘(HEAAN)을 이용하여 합산한 암호문 입니다.)</p>
                    <p className="hash-">해쉬 정보 미리보기</p>
                </div>
                <div className="hash-list">
                    <InfiniteScroll
                        datas={datas}
                        setDatas={setDatas}
                        scrollOptions={scrollOptions}
                        setScrollOptions={setScrollOptions}
                    />
                </div>
            </div>

    );
  }
  
  export default VoteVerification;