package com.prafull_product.service;

import java.util.List;

import com.prafull_product.entity.PatientBackup;

public interface PatientBackupService {
	
	public List<PatientBackup> getPatient();
	public void save (PatientBackup patient);
	public PatientBackup findById(Integer id);
	public void delete (PatientBackup patient);

}
