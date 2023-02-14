package com.sap.findthings.config;

import com.sap.findthings.services.impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * The type Global security configuration.
 */
@EnableWebSecurity
@Configuration
public class GlobalSecurityConfiguration extends WebSecurityConfigurerAdapter {

    /**
     * The User representation service.
     */
    @Autowired
    UserDetailsServiceImpl userRepresentationService;

    /**
     * Authentication provider dao authentication provider.
     *
     * @return the dao authentication provider
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(new BCryptPasswordEncoder());
        provider.setUserDetailsService(userRepresentationService);
        return provider;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers("/")
                .permitAll()
                .antMatchers("/orders/users/**")
                .hasAuthority("USER")
                .antMatchers("/orders/shop/**")
                .hasAuthority("SELLER")
                .antMatchers("/items/**")
                .hasAnyAuthority("USER", "SELLER")
                .antMatchers("/feedbacks", "/feedbacks/**")
                .hasAnyAuthority("USER", "SELLER")
                .antMatchers("/users/auth/**")
                .hasAnyAuthority("USER", "SELLER")
                .antMatchers(HttpMethod.PUT, "users/**")
                .hasAnyAuthority("USER", "SELLER")
                .antMatchers(HttpMethod.POST, "users")
                .hasAnyAuthority("ADMIN")
                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }
}