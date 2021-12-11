import React from 'react';
import { Layout, Menu, Checkbox } from 'antd';
import { BulbOutlined, StockOutlined } from '@ant-design/icons';
import './App.css';
import { colorStyle } from './assets/palettes/colorStyle_all_2_ok';
import ColorsetCard from './ColorsetCard';
import SubMenu from 'antd/lib/menu/SubMenu';
const { Header, Footer, Content } = Layout;
const CheckboxGroup = Checkbox.Group;

export interface AppState {
  industryFilter: string[];
  indeterminate: boolean;
  checkAll: boolean;
}

class App extends React.Component<{}, AppState> {
  // eslint-disable-next-line
  constructor(props: any) {
      super(props);
      this.state = {
        industryFilter: [],
        indeterminate: true,
        checkAll: false,
      }

  }
  
  onIndustryChange = (e: any) => {
    console.log('e', e);
    this.setState({
      industryFilter: e.target.value
    })
  }

  render() {
    const industryOperation = ['business', 'education', 'healthcare', 'finance', 'manufacturing', 'social', 'sports', 'technology'];
    const industryName = ['business', 'education', 'healthcare', 'finance', 'manufacturing', 'social media', 'sports', 'technology'];
    const { industryFilter, indeterminate, checkAll } = this.state;
    
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
            <Menu mode = "inline" openKeys = {['mode']} selectedKeys = {["dark"]} style = {{ height: '100%' }} >
              <SubMenu className = 'content-side-submenu' key = "mode" title = "Mode" >
                <Menu.Item key = "dark" >dark</Menu.Item>
                <Menu.Item key = "light" >light</Menu.Item>
              </SubMenu>
            </Menu>

            <Menu mode = "inline" openKeys = {['rank']} style = {{ height: '100%' }} >
              <SubMenu className = 'content-side-submenu' key = "rank" title = "Rank">
                <Menu.Item key = "aesthetics" >aesthetics</Menu.Item>
                <Menu.Item key = "distinctiveness" >distinctiveness</Menu.Item>
              </SubMenu>
            </Menu>

            <Menu mode = "inline" openKeys = {['industry']} style = {{ height: '100%' }} >
              <SubMenu className = 'content-side-submenu' key = "industry" title = "Industry">
                {/* <Menu.Item key = "business" >business</Menu.Item>
                <Menu.Item key = "education" >education</Menu.Item>
                <Menu.Item key = "healthcare" >healthcare</Menu.Item>
                <Menu.Item key = "finance" >finance</Menu.Item>
                <Menu.Item key = "manufacturing" >manufacturing</Menu.Item>
                <Menu.Item key = "social" >social media</Menu.Item>
                <Menu.Item key = "sports" >sports</Menu.Item>
                <Menu.Item key = "technology" >technology</Menu.Item> */}
                <Checkbox indeterminate={indeterminate}>
                  Check all
                </Checkbox>
                <CheckboxGroup options={industryOperation} value={industryName} onChange={this.onIndustryChange} />
              </SubMenu>
            </Menu>

           

          </div>
          <div className = 'content-main'>
            {colorStyle.map((industry) => {
              return industry.colorset.map((colorset) => {
                return <ColorsetCard info = {colorset} industryFilter = {this.state.industryFilter} />
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
