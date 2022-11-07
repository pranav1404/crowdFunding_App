import React, { useState } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3'
import { Router } from '../routes'

const ContributeForm = ({ address }) => {
    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();4
        setLoading(true);
        setErrorMessage('')

        const campaign = Campaign(address);

        try {
            const accounts = await web3.eth.getAccounts()
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            })

            Router.replaceRoute(`/campaigns/${address}`);
        } catch (err) {
            setErrorMessage(err.message);
        }

        setLoading(false);
        setValue('')
    };

    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input 
                    label="ether"
                    labelPosition="right"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage} />
            <Button primary loading={loading}>
                Contribute
            </Button>
        </Form>
    )
}

export default ContributeForm