package com.prafull_product.service;

import java.util.List;

import com.prafull_product.entity.Patient;

public interface PatientService {
	public List<Patient> getPatient();
	public void save (Patient patient);
	public Patient findById(Integer id);
	public void delete (Patient patient);
}
