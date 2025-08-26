package com.rental.rentalrooms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rental.rentalrooms.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
