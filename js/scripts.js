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

let numbers = [];       // L'array che conterrà i numeri mostrati in pagina
let outString;          // La stringa letta tramite il prompt
let outNumbers=[];      // L'array che conterrà i numeri estratti dal prompt

// Generiamo i 5 numeri casuali
for ( let i=0; i<5; i++)
{
    const number = generateRandomNumber();
    numbers.push(number);
}

// Mostriamoli in console
console.log(numbers);

// Facciamoli apparire in pagina
for ( let i=0; i<5; i++)
{
    const nInPage = document.getElementById('b'+i);
    nInPage.innerHTML = numbers[i]
}

// Diamo trenta secondi all'utente per memorizzare i numeri prima di farli sparire
setTimeout(changeColorNumbers, 30000);

/**
 * Qui adesso non ci può essere nessuna istruzione perché sarebbe eseguita
 * nel periodo in cui l'utente deve memorizzare i numeri
 * Il seguito del programma deve avvenire tramite chiamate a funzioni
 */

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

/**
 * changeColorNumbers()
 * Questa funzione serve a far sparire i numeri, 
 * colorandoli del colore del backgroud del body
 * Dopo aver fatto sparire l'ultimo numero, fa
 * apparire in magina il messaggio di scrivere i numeri
 * nel prompt e poi, ritardandola di 10ms invoca la 
 * funzione che fa apparire il prompt
 */
function changeColorNumbers()
{
    for ( let i=0; i<5; i++)
    {
        const nInPage = document.getElementById('b'+i);
        nInPage.style.color = 'aliceblue';
        if(i == 4)
        {
            /**
             * Il prompt ha una priorità altissima e sebbene messo dopo le istruzioni procedenti
             * lui appare quando i numeri sono ancora visibili.
             * E' stato quindi necessario insrire la sua chiamata in una funzione che è stata
             * ritardata di 10ms
             * Dopo appare il messaggio in pagina di inserire i 5 numeri separati dalla virgola.
             */
            setTimeout(doPrompt,10);
            const msgEl = document.getElementById('mb')
            msgEl.innerText = 'Scrivi i 5 numeri nel prompt separati dalla virgola'        
        }
    }

}

/** 
 * doPrompt()
 * Questa funzione invoca il prompt
 * Separa la stringa di uscita in 5 sottostringhe tramite split
 * Converte le scringhe in numeri ed invoca la funzione che 
 * verifica il numero di ingressi corretti
 */
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

/**
 * elaboration()
 * Questa funzione verifica i numeri inseriti tramite il metodo degli array includes
 * Se non sono stati inseriti 5 numeri appare il relativa 
 * messagio e l'elaborazione si blocca
 * Se i numeri sono 5 si contano quanti numeri inseriti sono presenti 
 * tra quelli mostrati.
 * I messaggi sono stati caratterizzati per i casi speciali
 * indovinati 0    ==>  'Hai sbagliato tutti i numeri !'
 * indovinati 1    ==>  'Hai inserito un solo numero giusto !'
 * indovinati > 1  ==>  'Hai inserito ' + indovinati +  ' numeri giusti !' 
 */
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