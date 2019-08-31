function test(e, msg) {
    alert(e);
    // alert(msg);
}

function tempateTraduction(hashtags, text) {
    // Calcul des variables
    const url = encodeURI('http://agri-traduction.fr');
    const sharedText = encodeURI(text);
    let hashtagText = "";
    let hashtagShared = "";

    hashtags.forEach(element => {
        hashtagText += " #" + element;
        hashtagShared += element + ",";
    });

    return `
        <div class="card-item" >
            <div class="card-body">
                <p class="card-text"> ${ text }</p>
                <p class="card-text"> ${ hashtagText } </p>
                <footer>
                  <p>Partager sur  
                  <a href="  https://www.facebook.com/sharer/sharer.php?u=${ url }&t=${ sharedText }" class="share facebook" data-network="facebook"> <img width='32px' src='./assets/img/facebook.png'></a>
                  <a href="https://twitter.com/share?url=${ url }&text=${ sharedText }&hashtags=${hashtagShared}" class="share twitter" data-network="twitter"><img width='66px' src='./assets/img/twitter.png'></a>
                  </p>
                </footer>
            </div> <!-- / card-body -->
        </div> <!-- / Card-item -->
    `;
}
