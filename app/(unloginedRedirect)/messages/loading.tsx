'use client'
import { FC } from 'react'
import c from './[id]/MessagesList.module.scss'
import ChatList from '../../../src/components/ChatList/ChatList'


const page: FC = () => {

  return <>
    <article className={`${c.left} block ${c.mobile_hidden}`}>
      <ChatList />
    </article>
    <article className={`${c.right} block ${c.main}`}>
      <div className={c.top}>
        <div className={c.empty_top_image} />
        <div>
          <h3 className={c.empty_top_username}></h3>
          <span className={c.empty_status} />
        </div>
      </div>
      <div className={c.main_messages}>
        <div className={c.meessages_container}>
          <div className={c.messages}>
            {[1, 2, 3, 4, 5].map((item) => <div key={item} className={c.message}>
              <div className={c.left_message}>
                <div className={c.empty_message_image} />
              </div>
              <div className={c.message_right}>
                <div className={c.message_top}>
                  <div className={c.empty_message_username} />
                </div>
                <div className={c.empty_message_content} />
              </div>
            </div>)}
          </div>
          <form className={c.input} onSubmit={(e) => e.preventDefault()}>
            <input value={''} readOnly />
            <button type='submit'>Send</button>
          </form>
        </div>
        <aside className={c.sidebar}>

        </aside>
      </div>
    </article>
  </>
}

export default page