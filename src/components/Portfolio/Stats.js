import React from 'react';
import UUID from 'uuid';
import { Table } from 'semantic-ui-react'
import EachStats from './EachStats'

const Stats = props => {
  //console.log(props);
  //if (props.betas.length >0 ){
  //Total Amount
  const total = 20000;
  const longEachSymbol = props.betas.filter(quote => quote.position_type === 'Long')
                                  .map(quote => quote.symbol)
  const shortEachSymbol = props.betas.filter(quote => quote.position_type === 'Short')
                                  .map(quote => quote.symbol)
  const longEachBeta = props.betas.filter(quote => quote.position_type === 'Long')
                                .map(quote => quote.beta)
  const shortEachBeta = props.betas.filter(quote => quote.position_type === 'Short')
                                .map(quote => quote.beta)
  //F61
  const totalBeta = props.betas.reduce((accumulator, currentValue) =>
    accumulator + currentValue.beta, 0
  )
  //F37
  const totalLongBeta = props.betas.reduce((accumulator, currentValue) => {
    if (currentValue.position_type === 'Long') {
      return accumulator + currentValue.beta;
    }
    return accumulator;
  }, 0)
  //F59
  const totalShortBeta = props.betas.reduce((accumulator, currentValue) => {
    if (currentValue.position_type === 'Short') {
      return accumulator + currentValue.beta;
    }
    return accumulator;
  }, 0)
  //G37
  const totalLongWeight = totalLongBeta / totalBeta;
  //G59
  const totalShortWeight = totalShortBeta / totalBeta;
  //G16-G21
  const longWeights = props.betas.filter(quote => quote.position_type === 'Long')
                                        .map(quote => quote.beta / totalBeta)
  //G38-G41
  const shortWeights = props.betas.filter(quote => quote.position_type === 'Short')
                                        .map(quote => quote.beta / totalBeta)
  //H37
  const longPortion = totalShortBeta / totalBeta;
  //H59
  const shortPortion = totalLongBeta / totalBeta;
  //I16-I21
  const longPortionWeights = props.betas.filter(quote => quote.position_type === 'Long')
                                .map(quote => quote.beta / totalLongBeta)
  //I38-I41
  const shortPortionWeights = props.betas.filter(quote => quote.position_type === 'Short')
                                .map(quote => quote.beta / totalShortBeta)
  //J16-J21
  const longEachPortion = longPortionWeights.map(portion => portion * longPortion)
  //J38-J41
  const shortEachPortion = shortPortionWeights.map(portion => portion * shortPortion)
  //long count
  const longCount = longEachPortion.length
  //short count
  const shortCount = shortEachPortion.length
  //K16-K21
  const longEachPosition = longEachPortion.map(portion =>
    (1 - portion / longPortion) / (longCount - 1) * longPortion
  )
  //K38-K41
  const shortEachPosition = shortEachPortion.map(portion =>
    (1 - portion / shortPortion) / (shortCount - 1) * shortPortion
  )
  //L16-L21
  const longEachAmount = longEachPosition.map(position => position * total)
  //L38-L41
  const shortEachAmount = shortEachPosition.map(position => position * total)
  // //L37
  // const totalLongAmount = longEachAmount.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue
  // )
  // //L59
  // const totalShortAmount = shortEachAmount.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue
  // )
  //M16-M21
  const longEachPrice = props.betas.filter(quote => quote.position_type === 'Long')
                                .map(quote => quote.price)
  //M38-M41
  const shortEachPrice = props.betas.filter(quote => quote.position_type === 'Short')
                                .map(quote => quote.price)
  //N16-N21
  let longShares = [];
  for(let i = 0; i < longCount; i++) {
    longShares.push(longEachAmount[i] / longEachPrice[i]);
  }
  //N38-N41
  let shortShares = [];
  for(let i = 0; i < shortCount; i++) {
    shortShares.push(shortEachAmount[i] / shortEachPrice[i]);
  }
  //O16-O21
  const longEachPercent = longEachAmount.map(amount => amount / total)
  //O38-O41
  const shortEachPercent = shortEachAmount.map(amount => amount / total)

  // totalBeta={totalBeta[i]}
  // totalLongBeta={totalLongBeta[i]}
  // totalLongWeight={totalLongWeight[i]}

  //For rendering
  const longList = [];
  for(let i = 0; i < longCount; i++) {
    longList.push(<EachStats
      key={UUID()}
      type='LONG'
      symbol={longEachSymbol[i]}
      beta={longEachBeta[i]}
      weight={longWeights[i]}
      portionWeight={longPortionWeights[i]}
      portion={longEachPortion[i]}
      position={longEachPosition[i]}
      amount={longEachAmount[i]}
      price={longEachPrice[i]}
      shares={longShares[i]}
      percent={longEachPercent[i]}
      />)
  }

  const shortList = [];
  for(let i = 0; i < shortCount; i++) {
    shortList.push(<EachStats
      key={UUID()}
      type='SHORT'
      symbol={shortEachSymbol[i]}
      beta={shortEachBeta[i]}
      weight={shortWeights[i]}
      portionWeight={shortPortionWeights[i]}
      portion={shortEachPortion[i]}
      position={shortEachPosition[i]}
      amount={shortEachAmount[i]}
      price={shortEachPrice[i]}
      shares={shortShares[i]}
      percent={shortEachPercent[i]}
      />)
  }
  return (
    <React.Fragment>
      <h3>Your Beta Hedge Status:</h3>
      <h3>Amount: 20000</h3>
      <Table color='black'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>Beta</Table.HeaderCell>
            <Table.HeaderCell>W%</Table.HeaderCell>
            <Table.HeaderCell>L/S%</Table.HeaderCell>
            <Table.HeaderCell>L/S W%</Table.HeaderCell>
            <Table.HeaderCell>%</Table.HeaderCell>
            <Table.HeaderCell>Position %</Table.HeaderCell>
            <Table.HeaderCell>$</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Shares</Table.HeaderCell>
            <Table.HeaderCell>P%</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {longList}
          <Table.Row>
            <Table.Cell className='head'></Table.Cell>
            <Table.Cell className='head'></Table.Cell>
            <Table.Cell className='head'>{totalLongBeta.toFixed(2)}</Table.Cell>
            <Table.Cell className='head'>{(totalLongWeight*100).toFixed(2)}%</Table.Cell>
            <Table.Cell className='head'>{(longPortion*100).toFixed(2)}%</Table.Cell>
            <Table.Cell className='head'>100.00%</Table.Cell>
            <Table.Cell className='head'>{(longPortion*100).toFixed(2)}%</Table.Cell>
            <Table.Cell className='head'>{(longPortion*100).toFixed(2)}%</Table.Cell>
            <Table.Cell className='head'>${(longPortion * total).toFixed(2)}</Table.Cell>
            <Table.Cell className='head'></Table.Cell>
            <Table.Cell className='head'></Table.Cell>
            <Table.Cell className='head'>{(longPortion*100).toFixed(2)}%</Table.Cell>
          </Table.Row>
          {shortList}
          <Table.Row>
            <Table.Cell className='head'></Table.Cell>
            <Table.Cell className='head'></Table.Cell>
            <Table.Cell className='head'>{totalShortBeta.toFixed(2)}</Table.Cell>
            <Table.Cell className='head'>{(totalShortWeight*100).toFixed(2)}%</Table.Cell>
            <Table.Cell className='head'>{(shortPortion*100).toFixed(2)}%</Table.Cell>
            <Table.Cell className='head'>100.00%</Table.Cell>
            <Table.Cell className='head'>{(shortPortion*100).toFixed(2)}%</Table.Cell>
            <Table.Cell className='head'>{(shortPortion*100).toFixed(2)}%</Table.Cell>
            <Table.Cell className='head'>${(shortPortion * total).toFixed(2)}</Table.Cell>
            <Table.Cell className='head'></Table.Cell>
            <Table.Cell className='head'></Table.Cell>
            <Table.Cell className='head'>{(shortPortion*100).toFixed(2)}%</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </React.Fragment>
  )
}

export default Stats;
