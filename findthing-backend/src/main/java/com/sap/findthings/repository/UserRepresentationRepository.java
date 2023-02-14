package com.sap.findthings.repository;

import com.sap.findthings.domain.UserRepresentation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * The interface User representation repository.
 */
@Transactional
@Repository
public interface UserRepresentationRepository extends CrudRepository<UserRepresentation, Integer> {

    /**
     * Find by user name and enabled user representation.
     *
     * @param username the username
     * @param enabled  the enabled
     * @return the user representation
     */
    UserRepresentation findByUserNameAndEnabled(final String username, final boolean enabled);

    /**
     * Find all by enabled list.
     *
     * @param enabled the enabled
     * @return the list
     */
    List<UserRepresentation> findAllByEnabled(final boolean enabled);

    /**
     * Find by id and user name optional.
     *
     * @param id       the id
     * @param username the username
     * @return the optional
     */
    Optional<UserRepresentation> findByIdAndUserName(final Integer id, final String username);


}
