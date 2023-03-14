import styled from "styled-components";

export const ServiceLogo = () => {
    return (
        <StyledHeader>Dutch Pay</StyledHeader>
    );
}

const StyledHeader = styled.h1`
    font-weight: 200;
    letter-spacing: 10px;
    color: slateblue;
    text-align: center;
    margin-bottom: 0.8em;
`;
