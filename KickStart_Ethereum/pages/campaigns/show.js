import React from 'react'
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign'
import { Card, Grid, Button } from 'semantic-ui-react'
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/ContributeForm'
import { Link } from '../../routes'

const CampaignShow = ({
    minimumContribution, 
    balance, 
    requestsCount, 
    approversCount, 
    manager,
    address
}) => {

    function renderCards() {
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'Manager created this contract and requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (Wie)',
                description: 'Minimum amount required to contribute to become a contributor in this contract',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: requestsCount,
                meta: 'Request Count',
                description: 'Number of Requests created by the Manager of this contract.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Total number of people who have already donated to this contract.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'Total Balance left for this contract to spend.',
                style: { overflowWrap: 'break-word' }
            }
        ];
        return <Card.Group items={items} />
    }

    return (
        <Layout>
            <h3>Campaign Details</h3>
            <Grid>
            <Grid.Row>
            <Grid.Column width={10}>
                {renderCards()}
            </Grid.Column>
            <Grid.Column width={6}>
                <ContributeForm  address={address} />
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                <Link route={`/campaigns/${address}/requests`}>
                    <a>
                        <Button primary>View Requests</Button>
                    </a>
                </Link>
                </Grid.Column>
            </Grid.Row>
            </Grid>
        </Layout>
    )
}

CampaignShow.getInitialProps = async (props) => {
    
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return { 
        minimumContribution: summary[0], 
        balance: summary[1], 
        requestsCount: summary[2], 
        approversCount: summary[3], 
        manager: summary[4],
        address: props.query.address,
    };
}

export default CampaignShow