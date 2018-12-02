import styled from 'styled-components';

const CloudHeaderListItemButton = styled.div`
  cursor: pointer; 
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0.875rem;
  transition: background-color 250ms cubic-bezier(0.5, 0, 0.1, 1);
 &:hover {
  background-color: #2c3f48;
 }
 :focus {
  background-color: #2c3f48;
  outline: 1px solid #3d70b2;
 }
`;

export default CloudHeaderListItemButton;