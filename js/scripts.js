console.log("ciao!");

/***
 * Descrizione esercizio
 * 
 * Visualizzare in pagina 5 numeri casuali. 
 * Da lì parte un timer di 30 secondi. 
 * Dopo 30 secondi i numeri scompaiono e l'utente deve inserire, 
 * uno alla volta, i numeri che ha visto precedentemente, 
 * tramite il prompt(). 
 * Dopo che sono stati inseriti i 5 numeri, 
 * il software dice quanti e quali dei numeri da indovinare 
 * sono stati individuati.
 */

let numbers = [];
let outString;
let outNumbers=[];
// Generiamo i 5 numeri casuali
for ( let i=0; i<5; i++)
{
    const number = generateRandomNumber();
    numbers.push(number);
}

console.log(numbers);

for ( let i=0; i<5; i++)
{
    const nInPage = document.getElementById('b'+i);
    nInPage.innerHTML = numbers[i]
}

setTimeout(changeColorNumbers, 6000);








/**
 * GenerateRandomNumber
 * Funzione che restituisce un intero compreso tra 1 e 100
 * @returns out
 */
function generateRandomNumber()
{
    const out = Math.floor(Math.random() * 100) + 1;
    return out;
}

function changeColorNumbers()
{
    for ( let i=0; i<5; i++)
    {
        const nInPage = document.getElementById('b'+i);
        nInPage.style.color = 'aliceblue';
        if(i == 4)
        {
            setTimeout(doPrompt,10);
            const msgEl = document.getElementById('mb')
            msgEl.innerText = 'Scrivi i 5 numeri nel prompt separati dalla virgola'        
        }
    }

}


function doPrompt()
{
    outString = prompt();
    outNumbers = outString.split(",");
    for( let i=0; i<outNumbers.length; i++)
    {
        outNumbers[i] = Number(outNumbers[i]);
    }
    elaboration();
}

function elaboration()
{
    if ( outNumbers.length != 5)
    {
        const outEl = document.getElementById('ob');
        outEl.innerText = 'Non hai inserito 5 numeri'     
    }
    else
    {

        let indovinati = 0;
        
        for (let i=0; i<outNumbers.length; i++)
        { 
            if (numbers.includes(outNumbers[i]))
            {
                indovinati++;
            }
        }
        const outEl = document.getElementById('ob');
        if (indovinati == 0)
        {
            outEl.innerText = 'Hai sbagliato tutti i numeri !'
        }
        else if (indovinati == 1)
        {
            outEl.innerText = 'Hai inserito un solo numero giusto !'
        }
        else
        {
            outEl.innerText = 'Hai inserito ' + indovinati +  ' numeri giusti !'     
        }
    }
}
 








  