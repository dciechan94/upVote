package pl.krakow.up.vote.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.HttpMethod;
import java.util.Arrays;

@Slf4j
@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationEntryPoint authEntryPoint;

    @Autowired
    private UserDetailsService userDetailsService;


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        		.cors().and().csrf().disable()
                .authorizeRequests()
                    .antMatchers(HttpMethod.POST,"/users").permitAll()
                    //.antMatchers(HttpMethod.PUT,"/users/**").authenticated()
                    //.antMatchers(HttpMethod.OPTIONS,"/logout/**").permitAll()
                    .anyRequest().authenticated()
                .and()
                    .httpBasic()
                    .authenticationEntryPoint(authEntryPoint)
                    //.and(failureHandler(customAuthenticationFailureHandler())
                .and()
                    .logout()
                    .logoutUrl("/logout").permitAll()
                    .invalidateHttpSession(true)
                    .clearAuthentication(true)
                    .deleteCookies("JSESSIONID")
                    .logoutSuccessHandler((httpServletRequest, httpServletResponse, authentication) -> {
                        httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    });

        /*http.cors().and().csrf().disable().authorizeRequests()
                .anyRequest().authenticated()
                .and()
                .httpBasic()
                .authenticationEntryPoint(authEntryPoint);*/
    }

    @Autowired
    public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
        log.info("Injecting UPVote UserDetailService implementation");
        auth.userDetailsService(userDetailsService);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Access-Control-Allow-Headers", "Origin", "Accept",
                "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers"));
        configuration.setAllowCredentials(true);

        //configuration.setAllowedMethods(Arrays.asList("*"));
        //configuration.setExposedHeaders(Arrays.asList("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
        //configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        log.info("Apply CORS configuration:\nAllowed origins: {}\nAllowed methods: {}\nAllowed headers: {}\nAllow credentials: {}",
                configuration.getAllowedOrigins(), configuration.getAllowedMethods(), configuration.getAllowedHeaders(),
                configuration.getAllowCredentials());

        return source;
    }
}