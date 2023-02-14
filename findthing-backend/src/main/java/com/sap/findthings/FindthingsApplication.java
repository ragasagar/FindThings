package com.sap.findthings;

import com.sap.findthings.repository.UserRepresentationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The type Findthings application.
 */
@SpringBootApplication
public class FindthingsApplication implements CommandLineRunner {

    /**
     * The User representation repository.
     */
    @Autowired
    UserRepresentationRepository userRepresentationRepository;

    /**
     * The entry point of application.
     *
     * @param args the input arguments
     */
    public static void main(String[] args) {
        SpringApplication.run(FindthingsApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
//        UserRepresentation userRepresentation = new UserRepresentation();
//        userRepresentation.setUserName("sagar");
//        userRepresentation.setRole("ADMIN");
//        userRepresentation.setPassword(new BCryptPasswordEncoder().encode("test"));
//        userRepresentation.setEnabled(true);
//        userRepresentationRepository.save(userRepresentation);
    }
}
