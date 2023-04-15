import React from 'react';
import styles from './helpPage.module.scss';
import Navbar from "../navbar";

const Help = () => {
    return (
        <div>
            <Navbar/>
            <div className={styles.helpPage}>
                <h1>Помощь</h1>
                <p>Если у вас возникли какие-либо вопросы или проблемы, связанные с использованием нашего сайта,
                    обратитесь к нашей службе поддержки.</p>
                <p className={styles.contactInfo}>Вы можете связаться с нами через:</p>
                <ul type='none'>
                    <li>Электронную почту: support@yoursite.com</li>
                    <li>Телефон: 8-800-555-55-55</li>
                </ul>
                <p>Если вы хотите получить дополнительную информацию о React, мы рекомендуем обратиться к официальной
                    документации React:</p>
                <ul type='none'>
                    <li><a href="https://reactjs.org/docs/getting-started.html">Документация по React</a></li>
                    <li><a href="https://reactjs.org/tutorial/tutorial.html">Обучающий курс React</a></li>
                    <li><a href="https://reactjs.org/community/support.html">Сообщество React</a></li>
                </ul>
                <div className={styles.sendMess}>
                <form className={styles.contactForm}>
                    <label className={styles.label} htmlFor="name">Имя:</label>
                    <input type="text" className={styles.name} name="name" required />

                    <label className={styles.label} htmlFor="email">Email:</label>
                    <input type="email" className={styles.email} name="email" required />

                    <label className={styles.label} htmlFor="message">Сообщение:</label>
                    <textarea className={styles.message} name="message" required></textarea>

                    <button className={styles.btn} type="submit">Отправить</button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default Help;
