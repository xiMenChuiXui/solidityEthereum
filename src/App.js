import React, {Component} from 'react';
import lottery from "./lottery";
import {Message, Container, Card, Image, Statistic, Button, Icon} from 'semantic-ui-react'
import web3 from "./web3";

class App extends Component {
    state = {
        manager: "",
        playersCount: 0,
        blance: 0,
        enterLoading: false,
        pickWinnerLoading: false,
        refundLoading: false,
        showButton: 'none'
    }

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        const manager = await lottery.methods.getManager().call()
        if (accounts[0] === manager) {
            this.setState({showButton: 'inline'})
        } else {
            this.setState({showButton: 'none'})
        }
        const count = await lottery.methods.getPlayersCount().call()
        const balance = await lottery.methods.getBalance().call()
        this.setState({
            manager: manager,
            playersCount: count,
            balance: web3.utils.fromWei(balance, 'ether')
        })
    }

    enter = async () => {
        const accounts = await web3.eth.getAccounts();
        this.setState({enterLoading: true})
        await lottery.methods.enter().send({
            from: accounts[0],
            value: "1000000000000000000"
        });
        // await web3.eth.sendTransaction({
        //     from: accounts[0],
        //     to: "0x07c76FC800A1cc1b7Da23B4e713B49E9866a3fb6",
        //     value: "1000000000000000000",
        // })
        this.setState({enterLoading: false})
        window.location.reload(true);
    }
    pickWinner = async () => {
        const accounts = await web3.eth.getAccounts();
        this.setState({pickWinnerLoading: true})
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        })
        this.setState({pickWinnerLoading: false})
        window.location.reload(true);
    }
    refund = async () => {
        const accounts = await web3.eth.getAccounts();
        this.setState({refundLoading: true})
        await lottery.methods.refund().send({
            from: accounts[0]
        })
        this.setState({refundLoading: false})
        window.location.reload(true);
    }

    render() {
        const {manager, playersCount, balance, enterLoading, refundLoading, pickWinnerLoading, showButton} = this.state
        return (
            <Container textAlign='center' text><br/>
                <Message info>
                    <Message.Header>区块链博彩项目</Message.Header>
                    <p>机不可失时不再来,快来梭哈吧</p>
                </Message>
                <Card fluid>
                    <Image src='/images/logo.jpg' size='medium' centered/>
                    <Card.Content>
                        <Card.Header>管理员地址:</Card.Header>
                        <Card.Meta>
                            <span className='date' size="mini">{manager}</span>
                        </Card.Meta>
                        <Card.Description>今晚八点半准时开奖</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <a>
                            <Icon name='user'/>
                            {playersCount} 人参与
                        </a>
                    </Card.Content>
                    <Statistic color='red'>
                        <Statistic.Value>{balance} ether</Statistic.Value>
                    </Statistic>
                    <Button animated='fade' onClick={this.enter} loading={enterLoading}
                            disabled={enterLoading}>
                        <Button.Content visible>赢了会所嫩模</Button.Content>
                        <Button.Content hidden>输了下海捞鱼</Button.Content>
                    </Button>
                    <Button color="green" style={{display: showButton}} loading={pickWinnerLoading}
                            disabled={pickWinnerLoading} onClick={this.pickWinner}>开奖</Button>
                    <Button color="blue" style={{display: showButton}} loading={refundLoading}
                            disabled={refundLoading} onClick={this.refund}>退钱</Button>
                </Card>
            </Container>
        );
    }
}

export default App;
