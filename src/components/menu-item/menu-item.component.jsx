import React from 'react';
import './menu-item.style.scss'

const MenuItem = ({title,imageUrl,size}) => (
    <div className={`${size} menu-item`}>
      <div style={
        {
          backgroundImage: `url(${imageUrl})`
        }
      } className="background-image">
      
      </div>
        <div className='content'>
          <div className='title'>{title.toUpperCase()}</div>
          <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
)

export default MenuItem;