function test(e, msg) {
    alert(e);
    // alert(msg);
}

function tempateTraduction(text) {
	
	const url = encodeURI('http://agri-traduction.fr');
	console.log(url);
    return `
        <div class="card-item" >
            <div class="card-body">
                <p class="card-text"> ${ text }</p>
                <footer>
                  <p>Partager sur  
                    <a href="  https://www.facebook.com/sharer/sharer.php?u=${ url }&t=${ text }" class="share facebook" data-network="facebook">Partager sur Facebook</a>
                    <a href="https://twitter.com/share?url=${url}&text=${ text }&hashtags='FierDeMonLait'" class="share twitter" data-network="twitter">Partager sur Twitter</a>
                  </p>
                </footer>
            </div> <!-- / card-body -->
        </div> <!-- / Card-item -->
    `;
}
