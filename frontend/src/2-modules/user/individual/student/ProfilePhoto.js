import React from 'react'
import styles from './ProfilePhoto.module.scss'

export default function ProfilePhoto ({img}) {
  return (
    <div className={styles.photo}>
      <img className='shadow' src={img || '/img/rodriguez.jpg'} />
    </div>
  )
}