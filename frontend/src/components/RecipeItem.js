import "./RecipeItem.css";
import { GiHotMeal } from "react-icons/gi";
import VisibilityIcon from "@mui/icons-material/Visibility";

function RecipeItem(props) {
  return (
    <div>
      <div className="recipe">
        <GiHotMeal className="recipeIcon" />
        <h2 className="recipeTitle">{props.item.Name}</h2>
        <VisibilityIcon className="viewIcon" />
      </div>
      <div id="share-buttons">

        <a class="facebook" target="blank"><i class="fab fa-facebook"></i></a>
      
        <a class="twitter" target="blank"><i class="fab fa-twitter"></i></a>
        
        <a class="linkedin" target="blank"><i class="fab fa-linkedin"></i></a>
        
        <a class="reddit" target="blank"><i class="fab fa-reddit"></i></a>

        <a class="instagram" target="blank"><i class="fab fa-instagram"></i></a>

      </div>
    </div>
  );
}

const link = encodeURI();
const msg = encodeURIComponent('Hey, I found this awesome recipe!');
const title = encodeURIComponent(document.querySelector('.recipeTitle'));

const fb = document.querySelector('.facebook');
fb.href = `https://www.facebook.com/share.php?u=${link}`;

const twitter = document.querySelector('.twitter');
twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=javascript,programming`;

const linkedIn = document.querySelector('.linkedin');
linkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`;

const reddit = document.querySelector('.reddit');
reddit.href = `http://www.reddit.com/submit?url=${link}&title=${title}`;

const instagram = document.querySelector('.instagram');
instagram.href = `http://www.instagram.com/submit?url=${link}&title=${title}`;

export default RecipeItem;
