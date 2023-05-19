package com.prafull_product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prafull_product.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer> {

}
