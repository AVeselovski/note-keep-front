import React, { Component } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from './theme';

const StyledApp = styled.div`
  background: ${props => props.theme.themeColor};
  min-height: 100vh;
  color: ${props => props.theme.grey};
`;

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <ThemeProvider theme={theme}>
          <StyledApp>
            <h1>Note Keep</h1>
          </StyledApp>
        </ThemeProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
