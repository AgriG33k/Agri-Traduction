function test(e, msg) {
    alert(e);
    // alert(msg);
}

function tempateTraduction(text) {
    return `
        <div class="card-item" >
            <div class="card-body">
                <p class="card-text"> ${ text }</p>
                <footer>
                  <p>Partager sur  
                  <a href="  https://www.facebook.com/sharer/sharer.php?u=http://agri-traduction.fr&t=${ text }" class="share facebook" data-network="facebook"> <img width='32px' src='./assets/img/facebook.png'></a>
                  <a href="https://twitter.com/share?&text=${ text }&url=http://agri-traduction.fr&hashtags=hashtag1,hashtag2" class="share twitter" data-network="twitter"><img width='66px' src='./assets/img/twitter.png'></a>
                  </p>
                    
                </footer>
            </div> <!-- / card-body -->
        </div> <!-- / Card-item -->
    `;
}
