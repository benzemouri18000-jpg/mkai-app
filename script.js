async function genererTenue(){

const resultat =
document.getElementById("resultat");

resultat.innerHTML =
"Analyse de votre dressing...";

setTimeout(() => {

resultat.innerHTML = `
<h3>Tenue recommandée</h3>

<p>
✔ Blazer beige<br>
✔ Chemise blanche<br>
✔ Jean bleu clair<br>
✔ Sneakers blanches
</p>
`;

},1500);

}
