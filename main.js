const transanctions =

[

    {

        id: Date.now(),
        description:"salario mensual",
        amount : 3500000,
        type:"income",

    },

    {

        id: Date.now(),
        description:"salario mensual",
        amount : 100000,
        type:"expense",

    }

]

class budgetTracker

{

    constructor()
    
    {

    this.transanctions=this.loadTransanctions();
    this.form=document.getElementById("transactionform");
    this.transactionlist=document.getElementById("transactionlist")
    this-balanceElement=document.getElementById("balance");

    this.initEventlisteners();
    this.renderTransactions();
    this.updateBalance();

    }

    loadTransanctions()
    
    {
    
        return[transanctions]
    
    }

    initEventlisteners()
    
    {
    
      
    
    }

    renderTransactions()
    
    {
    
     this.transactionlist.innerHTML="";
    
    }

    deleteTransanctions(id)
    
    {
    
    
    
    }

    updateBalance()
    
    {
    
       
    
    }



}

const budgetTracker = new budgetTracker();

