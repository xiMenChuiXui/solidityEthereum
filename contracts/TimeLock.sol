contract TimeLock{
    mapping(address=>unit) public balance;
    mapping(address=>unit) public lockTime;

    function deposit()public payable{
        balance[msg.sender]+=msg.value;
        lockTime[msg.sender]=now;
        increaseLockTime(1 weeks);
    }
   function increaseLockTime(uint _secondToIncrease)public{
        lockTime[msg.sender]+=_secondToIncrease;
   }
function withDraw()public{
    require(balance[msg.sender]>0);
    require(now>lockTime[msg.sender]);
    msg.sender.transfer(balance[msg.sender]);
    balance[msg.sender]=0;
}
}