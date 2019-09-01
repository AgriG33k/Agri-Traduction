function parler(msg) {
    // alert(msg);
    responsiveVoice.speak(msg, "French Female");
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
                    <!-- <a href="https://twitter.com/share?url=${ url }&text=${ sharedText }&hashtags=${hashtagShared}" class="share twitter" data-network="twitter"><img width='66px' src='./assets/img/twitter.png'></a> -->
                    <a href="https://twitter.com/intent/tweet?text=${ sharedText }&hashtags=${hashtagShared}" class="share twitter" data-network="twitter"><img width='66px' src='./assets/img/twitter.png'></a>
                    <a href="https://instagram.com" class="share twitter" data-network="twitter"><img src='./assets/img/instagram.png'></a>
                    <img onclick='parler(" ${ text } "); ' src='./assets/img/instagram.png' />
                </script>
                  </p>
                </footer>
            </div> <!-- / card-body -->
        </div> <!-- / Card-item -->
    `;
}
