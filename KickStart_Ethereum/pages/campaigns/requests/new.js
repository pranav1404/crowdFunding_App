import React, { useState } from 'react'
import Layout from '../../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3'
import { Link, Router } from '../../../routes'
import Campaign from '../../../ethereum/campaign'

const RequestNew = ({ address }) => {
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const [recipient, setRecipient] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async event => {
        event.preventDefault()
        setLoading(true)
        setErrorMessage()
        const campaign = Campaign(address)
        
        try{
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.createRequest(
                description,web3.utils.toWei(value, 'ether'),
                recipient
                ).send({
                    from: accounts[0]
                })
            
            Router.pushRoute(`/campaigns/${address}/requests`);
        } catch(err){
            setErrorMessage(err)
        }
        setLoading(false)
    }

    return (
        <Layout>
        <Link route={`/campaigns/${address}/requests`}>
            <a>
                Go Back
            </a>
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={(e)=>onSubmit(e)} error={!!errorMessage}>
            <Form.Field>
                <label>Description</label>
                <Input 
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
                />

            </Form.Field>

            <Form.Field>
                <label>Value in Ether</label>
                <Input 
                    value={value}
                    onChange={(e)=>{setValue(e.target.value)}}
                />
            </Form.Field>

            <Form.Field>
                <label>Recipient</label>
                <Input 
                    value={recipient}
                    onChange={(e)=>{setRecipient(e.target.value)}}
                />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage} />
            <Button primary loading={loading}>Create!</Button>
            </Form>
            </Layout>
    )
}

RequestNew.getInitialProps = async (props) => {
    
    const { address } = props.query;

    return { address };
}

export default RequestNew