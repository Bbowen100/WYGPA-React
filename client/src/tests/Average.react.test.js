import React from 'react';
import Average from '../components/Average';
import renderer from 'react-test-renderer';

test('Average calculates and displays the right average', () => {
  const mockCourses = [
    { name: 'comp1', mark: 78, weight: 1 },
    { name: 'comp2', mark: 77, weight: 2 },
    { name: 'comp3', mark: 76, weight: 1 },
    { name: 'comp4', mark: 75, weight: 2 },
    { name: 'comp5', mark: 74, weight: 1 }
  ];
  const component = renderer.create(
    <Average
      items={mockCourses}
      dispatch={param => {
        console.log(param);
      }}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  //expect(tree.state.average).toEqual(76);
});
