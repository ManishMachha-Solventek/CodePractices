package com.prafull_product.response;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.prafull_product.entity.Patient;

public interface PatientDao extends JpaRepository<Patient, Integer> {

	@Query(value = "select * from patient p where p.username = BINARY ?1 and p.password = BINARY ?2", nativeQuery = true)
	Patient findByUsernameAndPassword(String username, String password);

	@Transactional
	@Modifying
	@Query(value = "update patient p set p.id = ?1 where p.email = ?2", nativeQuery = true)
	void updatePatientIdByEmail(long id, String email);

	Boolean existsPatientByEmail(String email);
}
