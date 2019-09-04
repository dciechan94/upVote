package pl.krakow.up.vote.api.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.BasicHttpClientConnectionManager;
import org.apache.http.ssl.SSLContexts;
import org.apache.http.ssl.TrustStrategy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;
import pl.krakow.up.vote.api.model.UserDTO;
import pl.krakow.up.vote.api.model.VotePollDTO;
import pl.krakow.up.vote.model.VotePoll;

import javax.net.ssl.SSLContext;
import java.sql.*;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.UUID;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.notNullValue;

@Slf4j
class UserControllerTest {

    private RestTemplate restTemplate;
    private HttpHeaders headers;

    @BeforeEach
    public void setUpOnce() throws Exception {
//        String url = "jdbc:postgresql://192.168.99.100:5432/upVoteDb";
//        String user = "dbadmin";
//        String password = "Zaq123edc";
//
//        try (Connection con = DriverManager.getConnection(url, user, password)) {
//
//             Statement st = con.createStatement();
//             st.executeQuery("TRUNCATE user CASCADE;");
//
//
//        } catch (SQLException ex) {
//            log.error(ex.getMessage(), ex);
//        }

        TrustStrategy acceptingTrustStrategy = (cert, authType) -> true;
        SSLContext sslContext = SSLContexts.custom().loadTrustMaterial(null, acceptingTrustStrategy).build();
        SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext,
                NoopHostnameVerifier.INSTANCE);

        Registry<ConnectionSocketFactory> socketFactoryRegistry =
                RegistryBuilder.<ConnectionSocketFactory> create()
                        .register("https", sslsf)
                        .register("http", new PlainConnectionSocketFactory())
                        .build();

        BasicHttpClientConnectionManager connectionManager =
                new BasicHttpClientConnectionManager(socketFactoryRegistry);
        CloseableHttpClient httpClient = HttpClients.custom().setSSLSocketFactory(sslsf)
                .setConnectionManager(connectionManager).build();

        HttpComponentsClientHttpRequestFactory requestFactory =
                new HttpComponentsClientHttpRequestFactory(httpClient);

        restTemplate = new RestTemplate(requestFactory);
        headers = new HttpHeaders();
        headers.add("Authorization", "Basic YWRtaW5AdXB2b3RlLmNvbTpaYXExMjNlZGM=");
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);
    }


    @Test
    void testCreateUser() throws Exception {
        String login = "user-"+ UUID.randomUUID();
        UserDTO user = new UserDTO();
        user.setLogin(login);
        user.setRoles(Arrays.asList("UPV_User"));
        user.setEmail(login+"@xxx.com");
        user.setLastName("ZZZ");
        user.setFirstName("AAA");
        user.setPasswordHash("Zaq123edc");
        HttpEntity<UserDTO> entity = new HttpEntity<>(user, headers);

        ResponseEntity<Long> response;
        try {
            response = restTemplate.exchange("https://localhost:8082/users?code=Zaq123edc", HttpMethod.POST, entity, Long.class);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw e;
        }

        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
        assertThat(response.getBody(), notNullValue());
    }

    @Test
    void testCreateVotePoll() throws Exception {
        String login = "user-"+ UUID.randomUUID();
        UserDTO user = new UserDTO();
        user.setLogin(login);
        user.setRoles(Arrays.asList("UPV_User"));
        user.setEmail(login+"@xxx.com");
        user.setLastName("ZZZ");
        user.setFirstName("AAA");
        user.setPasswordHash("Zaq123edc");
        HttpEntity<UserDTO> entity = new HttpEntity<>(user, headers);

        ResponseEntity<Long> response;
        try {
            response = restTemplate.exchange("https://localhost:8082/users?code=Zaq123edc", HttpMethod.POST, entity, Long.class);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw e;
        }

        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
        assertThat(response.getBody(), notNullValue());

        VotePollDTO poll = new VotePollDTO();
        poll.setName("Miss Polsatu");
        poll.setDescription("Krotki opis wyborow");
        Long now = Instant.now().toEpochMilli();
        poll.setStartDate(now);
        poll.setEndDate(now + 10000);
        poll.setPublishDate((now + 30000));
        UserDTO cand1 = new UserDTO();
        cand1.setId(response.getBody());
        poll.setCandidates(Arrays.asList(cand1));

        HttpEntity<VotePollDTO> entity2 = new HttpEntity<>(poll, headers);
        try {
            response = restTemplate.exchange("https://localhost:8082/polls", HttpMethod.POST, entity2, Long.class);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw e;
        }
        assertThat(response.getStatusCode(), equalTo(HttpStatus.OK));
        assertThat(response.getBody(), notNullValue());
    }


//    @Test
//    void whenUserIsInvalid_thenReturnsStatus400() throws Exception {
//        UserDTO invalidUser = new UserDTO();
//        String body = objectMapper.writeValueAsString(invalidUser);
//
//        mvc.perform(put("/v1/users")
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON)
//                .content(body))
//                .andExpect(status().isBadRequest());
//    }
//
//    @Test
//    void whenUserIsValid_thenReturnsStatus200() throws Exception {
//        UserDTO validUser = new UserDTO();
//        validUser.setLogin("test");
//        validUser.setId(Long.valueOf(123));
//        validUser.setFirstName("AAA");
//        validUser.setLastName("BBB");
//        validUser.setEmail("a@b.c");
//        validUser.setPasswordHash("Zaq123edc");
//        String body = objectMapper.writeValueAsString(validUser);
//
//        User savedUser = new User();
//        savedUser.setId(1l);
//
//        Mockito.when(converter.toApiObject(savedUser)).thenReturn(validUser);
//        Mockito.when(converter.toModelObject(validUser)).thenReturn(savedUser);
//        Mockito.when(userRepository.save(Mockito.any())).thenReturn(savedUser);
//
//        mvc.perform(put("/v1/users")
//                .contentType(MediaType.APPLICATION_JSON)
//                .accept(MediaType.APPLICATION_JSON)
//                .content(body))
//                .andExpect(status().isCreated());
//
//        assertEquals(ObjectType.Constants.USER, validUser.getType());
//    }
}