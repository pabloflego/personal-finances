import React, {Component} from 'react';
import {Admin as ReactAdmin, Resource} from 'react-admin';
import {dataProvider, getAuthProvider} from '../shared/firebase';
import {PostCreate, PostEdit, PostIcon, PostList} from './posts/index';
import Login from './Login';
import {createMuiTheme} from '@material-ui/core/styles';

const authProvider = getAuthProvider();
const theme = createMuiTheme({
  palette: {type: 'dark'},
  typography: {useNextVariants: true},
});

export default class Admin extends Component {
  render() {
    const adminProps = {
      theme,
      dataProvider,
      authProvider,
      loginPage: Login,
    };
    return (
      <ReactAdmin {...adminProps}>
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
      </ReactAdmin>
    );
  }
}
