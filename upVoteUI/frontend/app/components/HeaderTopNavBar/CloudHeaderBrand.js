import styled from 'styled-components';

const CloudHeaderBrand = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #f2f4f8;
  transition: color 250ms cubic-bezier(0.5, 0, 0.1, 1);
  &:hover {
    color: #76aaea;
    cursor: pointer;
  }
  &:focus {
    color: #76aaea;
    outline: 1px solid #3d70b2;
  }
`;

export default CloudHeaderBrand;
