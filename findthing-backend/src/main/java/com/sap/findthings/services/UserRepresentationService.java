package com.sap.findthings.services;

import com.sap.findthings.domain.UserRepresentation;
import com.sap.findthings.exception.FindThingException;
import com.sap.findthings.repository.UserRepresentationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * The type User representation service.
 */
@Service
public class UserRepresentationService {

    @Autowired
    private UserRepresentationRepository userRepresentationRepository;

    /**
     * Gets user info by user name.
     *
     * @param userName the user name
     * @return the user info by user name
     */
    public UserRepresentation getUserInfoByUserName(String userName) {
        return userRepresentationRepository.findByUserNameAndEnabled(userName, true);
    }

    /**
     * Gets all active user info.
     *
     * @return the all active user info
     */
    public List<UserRepresentation> getAllActiveUserInfo() {
        return userRepresentationRepository.findAllByEnabled(true);
    }

    /**
     * Gets user info by id.
     *
     * @param id the id
     * @return the user info by id
     */
    public Optional<UserRepresentation> getUserInfoById(Integer id) {
        return userRepresentationRepository.findById(id);
    }

    /**
     * Add user user representation.
     *
     * @param userInfo the user info
     * @return the user representation
     */
    public UserRepresentation addUser(UserRepresentation userInfo) {
        userInfo.setPassword(new BCryptPasswordEncoder().encode(userInfo.getPassword()));
        try {
            return userRepresentationRepository.save(userInfo);
        } catch (Exception e) {
            throw new FindThingException(Collections.singletonList(e.getMessage()), HttpStatus.BAD_REQUEST.value());
        }
    }

    /**
     * Update user user representation.
     *
     * @param id         the id
     * @param userRecord the user record
     * @param name       the name
     * @return the user representation
     */
    public UserRepresentation updateUser(Integer id, UserRepresentation userRecord, String name) {
        if (null != id) {
            Optional<UserRepresentation> userInfo = userRepresentationRepository.findByIdAndUserName(id, name);
            if (userInfo.isPresent()) {
                UserRepresentation userRepresentation = userInfo.get();
                userRepresentation.setUserName(userRecord.getUserName());
                userRepresentation.setPassword(new BCryptPasswordEncoder().encode(userRecord.getPassword()));
                userRepresentation.setRole(userRecord.getRole());
                userRepresentation.setEnabled(userRecord.isEnabled());
                userRepresentation.setEmail(userRecord.getEmail());
                userRepresentation.setShop(userRecord.getShop());
                userRepresentation.setAddress(userRecord.getAddress());
                return userRepresentationRepository.save(userRepresentation);
            } else {
                throw new FindThingException(Collections.singletonList("USER NOT FOUND"), HttpStatus.NOT_FOUND.value());
            }
        }
        throw new FindThingException(Collections.singletonList("Missing ID parameter"), HttpStatus.BAD_REQUEST.value());
    }

    /**
     * Delete user.
     *
     * @param id the id
     */
    public void deleteUser(Integer id) {
        userRepresentationRepository.deleteById(id);
    }

    /**
     * Update password user representation.
     *
     * @param id         the id
     * @param userRecord the user record
     * @param username   the username
     * @return the user representation
     */
    public UserRepresentation updatePassword(Integer id, UserRepresentation userRecord, final String username) {
        if (null != id) {
            Optional<UserRepresentation> userInfo = userRepresentationRepository.findByIdAndUserName(id, username);
            if (userInfo.isPresent()) {
                UserRepresentation userRepresentation = userInfo.get();
                userRepresentation.setPassword(new BCryptPasswordEncoder().encode(userRecord.getPassword()));
                return userRepresentationRepository.save(userRepresentation);
            } else {
                throw new FindThingException(Collections.singletonList("USER NOT FOUND"), HttpStatus.NOT_FOUND.value());
            }
        }
        throw new FindThingException(Collections.singletonList("Missing ID parameter"), HttpStatus.BAD_REQUEST.value());
    }

    /**
     * Update role user representation.
     *
     * @param id         the id
     * @param userRecord the user record
     * @param username   the username
     * @return the user representation
     */
    public UserRepresentation updateRole(Integer id, UserRepresentation userRecord, String username) {
        if (null != id) {
            Optional<UserRepresentation> userInfo = userRepresentationRepository.findByIdAndUserName(id, username);
            if (userInfo.isPresent()) {
                UserRepresentation userRepresentation = userInfo.get();
                userRepresentation.setRole(userRecord.getRole());
                return userRepresentationRepository.save(userRepresentation);
            } else {
                throw new FindThingException(Collections.singletonList("USER NOT FOUND"), HttpStatus.NOT_FOUND.value());
            }
        }
        throw new FindThingException(Collections.singletonList("Missing ID parameter"), HttpStatus.BAD_REQUEST.value());
    }
}