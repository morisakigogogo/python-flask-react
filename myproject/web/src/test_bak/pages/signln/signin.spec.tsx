import React from 'react';
import renderer from 'react-test-renderer';
// import { mount } from 'enzyme';
import Signin from '../../../pages/SignIn/SignIn';
// import Enzyme, { shallow } from 'enzyme';

describe('singin test', () => {
  test('snapshot renders', () => {
    const comp = renderer.create(<Signin />);
    const tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('snapshot renders', () => {
    const wrapper = shallow(<Signin />);
    expect(wrapper.find('h1')).toContain('ログイン');
  });
});
