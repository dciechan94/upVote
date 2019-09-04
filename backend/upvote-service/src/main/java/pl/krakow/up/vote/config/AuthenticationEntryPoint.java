package pl.krakow.up.vote.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;


@Component
public class AuthenticationEntryPoint extends BasicAuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authEx)
            throws IOException {

        Map<String, String> body = new HashMap<>();
        body.put("code", "401");
        body.put("message", authEx.getMessage());
   //   JSONObject json = new JSONObject(body);

        ObjectMapper objectMapper = new ObjectMapper();


        response.addHeader("WWW-Authenticate", "Basic realm=" +getRealmName());
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        PrintWriter writer = response.getWriter();
        //writer.println("HTTP Status 401 - " + authEx.getMessage());
        writer.write(objectMapper.writeValueAsString(body));

    }

//    @Override
//    public void commence(HttpServletRequest req, HttpServletResponse res, AuthenticationException authException) throws IOException, ServletException {
//        res.setContentType("application/json;charset=UTF-8");
//        res.setStatus(403);
//        res.getWriter().write(JsonBuilder //my util class for creating json strings
//                .put("timestamp", DateGenerator.getDate())
//                .put("status", 403)
//                .put("message", "Access denied")
//                .build());
//    }

    @Override
    public void afterPropertiesSet() throws Exception {
        setRealmName("PedagogicalUniversityVote");
        super.afterPropertiesSet();
    }

}