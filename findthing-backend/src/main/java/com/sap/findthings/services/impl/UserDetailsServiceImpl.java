package com.sap.findthings.services.impl;


import com.sap.findthings.domain.UserRepresentation;
import com.sap.findthings.services.UserRepresentationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

/**
 * The type User details service.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepresentationService userRepresentationService;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        UserRepresentation userInfo = userRepresentationService.getUserInfoByUserName(userName);
        GrantedAuthority authority = new SimpleGrantedAuthority(userInfo.getRole());
        return new User(userInfo.getUserName(), userInfo.getPassword(), Arrays.asList(authority));
    }
}