import React from 'react'
import { Link } from 'react-router-dom'
const Post = () => {
  return (
    <div className='post'>
      <div className="image">
        <Link to="./post/:id">
          <img src="https://talkatalka.com/wp-content/uploads/2023/01/Content05-02.jpg" alt="" />
        </Link>
      </div>
      <div className="texts">
        <Link to ="./post/:id">
          <h2 href="">
            Blog
          </h2>
        </Link>
        <p className="info">
          <a href="" className="author"> Bowornlak</a>
          <time>12 de 2023 - 18:12</time>
        </p>
        <p className="summary">
          Blog - ทุกวันนี้การเป็นที่รู้จักทางออนไลน์อาจเป็นเรื่องที่ท้าทาย ด้วยพื้นที่ในโลกดิจิทัลนั้นมีการแข่งขันสูงมากขึ้นในแต่ละวัน 
          ทั้งในเสิร์ชเอ็นจิ้นและบนโซเชียลมีเดีย ดังนั้น ในการดึงดูดผู้ชมมายังเว็บไซต์ของคุณ
           คุณต้องหาวิธีที่จะทำให้ธุรกิจของคุณโดดเด่นและสามารถส่งมอบคุณค่าให้แก่ผู้ติดตาม และนี่เองที่ทำให้การสร้างบล็อก
            ถือเป็นส่วนสำคัญที่ทุกธุรกิจไม่ควรมองข้าม แน่นอนว่านี่ไม่ใช่แนวคิดใหม่ อย่างไรก็ตาม ถ้าคุณยังไม่มีบล็อกบนเว็บไซต์ของคุณ 
            แสดงว่าคุณกำลังพลาดโอกาสครั้งใหญ่ในการดึงดูดลูกค้าเป้าหมายและเพิ่มคอนเวอร์ชั่นให้แก่ธุรกิจของคุณไปหนึ่งเรื่องแล้วครับ
        </p>
      </div>
    </div>
  )
}

export default Post