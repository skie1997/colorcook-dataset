import React from 'react';
import { Layout, Menu } from 'antd';
import { BulbOutlined, StockOutlined } from '@ant-design/icons';
import './App.css';
import { colorStyle } from './assets/palettes/colorStyle_all_2_ok';
import ColorsetCard from './ColorsetCard';
import SubMenu from 'antd/lib/menu/SubMenu';
const { Header, Footer, Sider, Content } = Layout;

class App extends React.Component {
  handleClick = (e: any) => {
    console.log('e', e);
  }
  render() {
    return(
    <div className="App">
      <Layout>
        <Header className = 'header'>
          <h1 className = 'header-title'>Palettes Gallery Of ColorCook</h1>
          <h3 className = 'header-description'>
            We collected graphic designs(illustrations) that depict scenarios of the identified domains and extracted corresponding color palettes from these
            designs. We also validated the dataset from three aspects, including distinctiveness, aesthetics, and specificity. The
            final dataset contains 115 manually curated palettes and is released to support the design of future data-driven color
            authoring tools. 
          </h3>
        </Header>
        <Content className = 'content'>
          <div className = 'content-side'>
            <Menu mode = "inline" openKeys = {['mode']} style = {{ height: '100%' }} onClick = {this.handleClick}>
              <SubMenu key = "mode" title = "Mode">
                <Menu.Item key = "dark" >dark</Menu.Item>
                <Menu.Item key = "light" >light</Menu.Item>
              </SubMenu>
            </Menu>

            <Menu mode = "inline" openKeys = {['rank']} style = {{ height: '100%' }} onClick = {this.handleClick}>
              <SubMenu key = "rank" title = "Rank">
                <Menu.Item key = "aesthetics" >aesthetics</Menu.Item>
                <Menu.Item key = "distinctiveness" >distinctiveness</Menu.Item>
              </SubMenu>
            </Menu>

            <Menu mode = "inline" openKeys = {['industry']} style = {{ height: '100%' }} onClick = {this.handleClick}>
              <SubMenu key = "industry" title = "Industry">
                <Menu.Item key = "business" >business</Menu.Item>
                <Menu.Item key = "education" >education</Menu.Item>
                <Menu.Item key = "healthcare" >healthcare</Menu.Item>
                <Menu.Item key = "finance" >finance</Menu.Item>
                <Menu.Item key = "manufacturing" >manufacturing</Menu.Item>
                <Menu.Item key = "social" >social media</Menu.Item>
                <Menu.Item key = "sports" >sports</Menu.Item>
                <Menu.Item key = "technology" >technology</Menu.Item>
              </SubMenu>
            </Menu>

          </div>
          <div className = 'content-main'>
            {colorStyle.map((industry) => {
              return industry.colorset.map((colorset) => {
                return <ColorsetCard info = {colorset}/>
              })
            })}
          </div>
        </Content>
        <Footer className = 'footer'>Copyright © 2021-2021 Siji Chen. All rights reserved.</Footer>
      </Layout>
    </div>
    )
  };
}

export default App;
