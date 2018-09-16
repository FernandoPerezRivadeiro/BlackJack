    
            $(document).ready(function(){ // read externak file
    
            $.get("Cards.txt", myReader);
    
            });
             
            $(document).ready(function(){ // make buttons disappear every time
            document.getElementById("wins").innerHTML = 0;
            document.getElementById("losses").innerHTML = 0;
            
            if(document.getElementById("number").innerHTML === "")
            {
            $("#hit").hide();
            $("#stand").hide();
            $("#again").hide();
            $("#form").hide();
            }
 
        });
            
            //stand Status + win status
            var standAI;
            var standDealer;
            
            //beginning counters
            var cardValPlayer = 0;
            var cardValComp = 0;
            var cardValDeal = 0;
            //hitting / standing counters
            var countDeal = 6;
            var countMine = 7;
            var countAI = 8;
            //winning/lossing counters
            var won = 0;
            var lost = 0;
            
            var allCards = [];
            var myPile = [];
            var playerPile = [];
            var dealerPile = [];
            var splitted = "";
            var singleCards = "";
            
            
       
            function shuffle(deck) { // shuffle the deck
                        var j, x, i;
                        for (i = deck.length; i; i--) {
                        j = Math.floor(Math.random() * i);
                        x = deck[i - 1];
                        deck[i - 1] = deck[j];
                        deck[j] = x;
                        }   
                    }
            
           //deck creator. It brings out the deck
           function myReader(data, status){
           if (status == "success"){
            
            singleCards = data.split("\n");
    
               for(i = 0; i < singleCards.length; i++)
               {
                   splitted = singleCards[i].split(",");
                   allCards.push(splitted);
               }
                   shuffle(allCards);
              }   
           }
           
           //This is for the "Quit" button
            function makeAppear(){
           
            //score
            var score = (won - lost);
            document.getElementById("userScore").innerHTML = score;
            
                        $("#form").show();
                        $("#hit").hide();
                        $("#stand").hide();
                        $("#get").hide();
                        $("#again").hide();
                        $("#bye").hide();
            }
           
           //to start the game push 2 cards to each hand.
            function getCards()
            {
            //delete before anything
            document.getElementById("winner").innerHTML = "";
                        
            //if there's no value for the player or it's 0 hand cards to everyone
                if(document.getElementById("number").innerHTML === "" || document.getElementById("number").innerHTML === "0")
            {
                dealerPile.push("<img src= CardPics/" + allCards[0] + ".png>");
                dealerPile.push("<img src= CardPics/" + allCards[1] + ".png>");
                myPile.push("<img src= CardPics/" + allCards[2] + ".png>");
                myPile.push("<img src= CardPics/" + allCards[3] + ".png>");
                playerPile.push("<img src= CardPics/" + allCards[4] + ".png>");
                playerPile.push("<img src= CardPics/" + allCards[5] + ".png>");
                
                // displayers
                $("#dealerCards").append(dealerPile);
                $("#myCards").append(myPile);
                $("#opponentCards").append(playerPile);   
            }

            //assingn values and display on screen
                cardValPlayer = checkerFunc(myPile, cardValPlayer, "number"); 
                cardValComp= checkerFunc(playerPile, cardValComp, "numberAI");
                cardValDeal = checkerFunc(dealerPile, cardValDeal, "numberDealer");

                winnerCheck2();
                winnerCheckComplement();
              
                 $("#hit").show();
                 $("#stand").show();
                 $("#get").hide();
                 $("#again").show();
                 
                 //delete all speaks
                 document.getElementById("speakAI").innerHTML = "";
                 document.getElementById("speakAI").innerHTML = "";
            }
            
           
            function hitMe() // just push one
            {            

             if(countAI < 51 && countMine < 51 && countDeal < 51)
             {
              myPile.push("<img src= CardPics/" + allCards[countMine] + ".png>");
              $("#myCards").append("<img src= CardPics/" + allCards[countMine] + ".png>");
              cardValPlayer = checkerFunc(myPile, cardValPlayer, "number");
              countMine += 3;
              thinkAI();
             }
              winnerCheck();
              winnerCheckComplement();
            }
            
             function standUser() // you don't want any more cards
            {
            var random = Math.floor(Math.random() * 100);
            alert(random);

            cardValPlayer = checkerFunc(myPile, cardValPlayer, "number");

             thinkAI();
             winnerCheck();
             winnerCheckComplement();
            }
            
            //return everything to default
            function restarter() // clear all array content
            {            
            for(var i = 0; i < dealerPile.length; i++)
            {
                        dealerPile.splice(i, 5);
            }
            
            for(var j = 0; j < myPile.length; j++)
            {
                       myPile.splice(j, 5);
            }
            
            for(var k = 0; k < playerPile.length; k++)
            {
                       playerPile.splice(k, 5);
            }
            
            //re-calculate and desplay
            checkerFunc(myPile, cardValPlayer, "number"); 
            checkerFunc(playerPile, cardValComp, "numberAI");
            checkerFunc(dealerPile, cardValDeal, "numberDealer");
             //clear DIV on screen
             $("#myCards").empty();
             $("#dealerCards").empty();
             $("#opponentCards").empty();
            // Make the Sart Game visible again
            document.getElementById("get").style.visibility = "visible";
            //reset counters for hits
            countDeal = 6;
            countMine = 7;
            countAI = 8;
            //re-shuffle / create a new deck
            shuffle(allCards);
            //hide and show
            $("#hit").hide();
            $("#get").show();
            $("#bye").show();
            $("#stand").hide();
                        
            
            }
            

            // Autimatic actions FOR THE COMPUTER PLAYERS//////////////////////////////////////////////////////////////////
             function thinkAI(){
             //AI player share
              var random = Math.floor(Math.random() * 100);
              if(playerPile.length <= 4){
              countAI += 3;
                        if(cardValComp >= 17 && cardValComp < 21)
                        {
                            if(random % 8.5)
                            {
                            document.getElementById("speakAI").innerHTML = "Computer Stands";
                            // does nothing and checks who won
                            cardValComp = checkerFunc(playerPile, cardValComp, "numberAI");
                            standAI = true;
                            }
                            else
                            {
                            document.getElementById("speakAI").innerHTML = "Computer Keeps Playing";
                            //pushes cards and checks who won
                            playerPile.push("<img src= CardPics/" + allCards[countAI] + ".png>");
                            $("#opponentCards").append("<img src= CardPics/" + allCards[countAI] + ".png>");
                            countAI += 3;
                            cardValComp = checkerFunc(playerPile, cardValComp, "numberAI");
                            standAI = false;
                            }
                        }
                         //no more cards if busted or has more than 5 cards
                        else if(cardValComp > 21)
                        {
                            document.getElementById("speakAI").innerHTML = "";
                            cardValComp = checkerFunc(playerPile, cardValComp, "numberAI");
                            standAI = true;
                        }
                        else if( cardValComp < 17)
                        {
                             playerPile.push("<img src= CardPics/" + allCards[countAI] + ".png>");
                            $("#opponentCards").append("<img src= CardPics/" + allCards[countAI] + ".png>");
                            countAI += 3;
                            cardValComp = checkerFunc(playerPile, cardValComp, "numberAI");
                            standAI = false;       
                        }
            }
                        else if(playerPile.length > 5)
                        {
                            standAI = true;
                        }
                        
           // dealer share  
            if(dealerPile.length <= 4){
              countDeal += 3;
                 if(cardValDeal >= 18 && cardValDeal < 21) // chekck for value of both players 
                    {
                                    
                        if(random == 59)
                        {
                        document.getElementById("speakDealer").innerHTML = "Dealer Stands";
                        // does nothing and checks who won
                        cardValDeal = checkerFunc(dealerPile, cardValDeal, "numberDealer");
                        standDealer = true;
                        }
                        else
                        {
                        document.getElementById("speakDealer").innerHTML = "Dealer Keeps Playing";
                        //pushes cards and checks who won
                        dealerPile.push("<img src= CardPics/" + allCards[countDeal] + ".png>");
                        $("#dealerCards").append("<img src= CardPics/" + allCards[countDeal] + ".png>");
                        cardValDeal = checkerFunc(dealerPile, cardValDeal, "numberDealer");
                        standDealer = false;
                        }
                        
                        }
                        //no more cards if busted or has more than 
                        else if(cardValDeal > 21)
                        {
                              document.getElementById("speakDealer").innerHTML = "";
                              cardValDeal = checkerFunc(dealerPile, cardValDeal, "numberDealer");
                              standDealer = true;
                        }
                        else if( cardValDeal < 17)
                        {
                            dealerPile.push("<img src= CardPics/" + allCards[countDeal] + ".png>");
                            $("#dealerCards").append("<img src= CardPics/" + allCards[countDeal] + ".png>");
                            countAI += 3;
                            cardValDeal = checkerFunc(dealerPile, cardValDeal, "numberDealer");
                            standDealer = false;       
                        }
            }
                    else if(dealerPile.length > 5)
                    {
                        standDealer = true;
                    }
            }
                  
            
            // THINK FOR THE COMPUTER PLAYERS//////////////////////////////////////////////////////////////////
            
           
            
               
            // gives away the current winner of the match based on their Card VAlues!
            function winnerCheck()
            { // because referies can be bought
                        
                        player = cardValPlayer;
                        comp = cardValComp;
                        deal = cardValDeal;
                        
                        
                        if(player > 21 || player != 21 && comp == 21 && deal != 21 || player != 21 && comp != 21 && deal == 21)
                        {
                         document.getElementById("winner").innerHTML = "YOU LOST";
                         alert("lost");
                        }
                        
                        if(player < 21 && comp > 21 && deal > 21 || player == 21 && comp != 21 && deal != 21)
                        {
                         document.getElementById("winner").innerHTML = "WINNER: YOU WON";
                         alert("won");
                        }
                        
                        //ties. we all suck sometimes
                        if(player > 21 && comp > 21 && deal > 21)
                        {
                         document.getElementById("winner").innerHTML = "WINNER: NOBODY! YOU ARE ALL AWFUL!";
                         
                        }
                        
                        if(player == 21 && comp == 21 && deal == 21)
                        {
                         document.getElementById("winner").innerHTML = "WINNER: OH JEEZ, WHAT ARE THE ODDS?";
                        }

                        
                        //special case: everybody stands but you have more so you win.
                        if(player > comp && player > deal && player < 21)
                        {
                                    if(standDealer === true && standAI === true)
                                    {
                                        document.getElementById("winner").innerHTML = "WINNER: YOU WON";
                                    }
                        }
                        
                         if(player == comp && player > deal && player < 21)
                        {
                                    if(standDealer === true && standAI === true)
                                    {
                                        document.getElementById("winner").innerHTML = "IT'S A TIE";     
                                    }
                        }
                        
                         if(player > comp && player == deal && player < 21)
                        {
                                    if(standDealer === true && standAI === true)
                                    {
                                        document.getElementById("winner").innerHTML = "IT'S A TIE";    
                                    }
                        }
                        
            }
            
            //based on whatever the WinnerCheck function displays, this function Performs the adding towards the user score!
            function winnerCheckComplement()
            {
                      if(document.getElementById("winner").innerHTML == "IT'S A TIE" || document.getElementById("winner").innerHTML === "WINNER: OH JEEZ, WHAT ARE THE ODDS?" || document.getElementById("winner").innerHTML === "WINNER: NOBODY! YOU ARE ALL AWFUL!")
                      {
                        $("#hit").hide();
                        $("#stand").hide();
                      }
                      
                      if(document.getElementById("winner").innerHTML == "WINNER: YOU WON" || document.getElementById("winner").innerHTML == "WINNER: YOU WON. BLACKJACK!")
                      {
                        won += 1;
                        document.getElementById("wins").innerHTML = won;
                        $("#hit").hide();
                        $("#stand").hide();
                      }
                      
                      if(document.getElementById("winner").innerHTML == "YOU LOST")
                      {
                        lost += 1;
                        document.getElementById("losses").innerHTML = lost;
                        $("#hit").hide();
                        $("#stand").hide();
                      }
                      
            }
            
            //winning notification for only the first turn
            function winnerCheck2()
            {
                        player = cardValPlayer;
                        comp = cardValComp;
                        deal = cardValDeal;
            if(player == 21 && comp != 21 && deal != 21)
                        {
                        document.getElementById("winner").innerHTML = "WINNER: YOU WON. BLACKJACK!";
                        $("#hit").hide();
                        $("#stand").hide();
                        }
                        
            if((player != 21 && comp == 21 && deal != 21) || (player != 21 && comp != 21 && deal == 21))
                        {
                        document.getElementById("winner").innerHTML = "YOU LOST";
                        $("#hit").hide();
                        $("#stand").hide();
                        }
            }
            
            //gives away the points for each hand
             function checkerFunc(a, cardVal, str)
             {
               cardVal = 0; // counter always resets every new hand!
                        // assigns values to all 'royalties', aces and numbers and adds them to the local variable
                        for(var i = 0; i < a.length; i++){
                        if(a[i].includes("jack") || a[i].includes("queen") || a[i].includes("king"))
                        {
                            cardVal += 10;
                        }
                        else if (a[i].includes("ace"))
                        {
                            if(cardVal <= 10)
                            {
                                cardVal += 11;
                            }
                            else
                            {
                                cardVal += 1;
                            }
                        }
                        else if(a[i].includes("2"))
                        {
                        cardVal += 2;
                        }
                        else if(a[i].includes("3"))
                        {
                        cardVal += 3 ;
                        }
                         else if(a[i].includes("4"))
                        {
                        cardVal += 4;
                        }
                        else if(a[i].includes("5"))
                        {
                        cardVal += 5;
                        }
                         else if(a[i].includes("6"))
                        {
                        cardVal += 6;
                        }
                        else if(a[i].includes("7"))
                        {
                        cardVal += 7;
                        }
                         else if(a[i].includes("8"))
                        {
                        cardVal += 8;
                        }
                        else if(a[i].includes("9"))
                        {
                        cardVal += 9;
                        }
                         else if(a[i].includes("10"))
                        {
                        cardVal += 10;
                        }
                        }
                       document.getElementById(str).innerHTML = cardVal;
                       return cardVal;
                    }
                    
            //calling the php
            function ajaxWay() {
       // syntax: $.post(URL,data,callback);
            won = 0;
            lost = 0;
            document.getElementById("wins").innerHTML = 0;
            document.getElementById("losses").innerHTML = 0;
            
            
            $.post("Leader.php",
            {
                TheScore:  document.getElementById("userScore").innerHTML,
                TheName: $("#name").val(),
                FileName: "Leaders.txt"
            }
            ,function(dataFromtheServer) {
                alert(dataFromtheServer);
                 $("#form").hide();
                 $("#again").show();
            });
       
   }