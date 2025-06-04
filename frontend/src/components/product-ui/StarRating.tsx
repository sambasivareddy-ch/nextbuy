import React from 'react';

import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import styles from "../../styles/starrating.module.css"

const StarRating: React.FC<{rating: number, count: number}> = (props) => {
  const getStarClass = (index: number) => {
        if (props.rating >= index + 1) return 'star-full';
        if (props.rating >= index + 0.5) return 'star-half';
        return 'star-empty';
  };

  return (
    <div className={styles['star-rating']}>
      <p><b>Review:</b></p>
      <div>
        {[...Array(5)].map((_, index) => (
            getStarClass(index) === "star-empty"? <StarOutlineIcon key={Math.random()}/> :
            getStarClass(index) === "star-half"? <StarHalfIcon key={Math.random()}/>: <StarIcon key={Math.random()}/>
        ))}
      </div>
      <p>{props.rating}(/{props.count})</p>
    </div>
  );
};

export default StarRating;
