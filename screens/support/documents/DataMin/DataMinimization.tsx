import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
const text = `1. Purpose
This data minimization policy aims to ensure compliance with applicable data privacy laws in the storage of investment data. It outlines the guidelines and practices to minimize the collection, processing, and retention of personal and sensitive information, reducing potential privacy risks and maintaining data privacy and security.

2. Scope
This policy applies to all employees, contractors, and third-party entities involved in the collection, processing, and storage of investment data.

3. Policy Statement
a. Personal Data: Only collect and process personal data necessary for the legitimate purposes of investment management and in accordance with applicable data privacy laws.
b. Sensitive Data: Minimize the collection, storage, and processing of sensitive data related to investments unless required for legal or regulatory compliance.
c. Data Purpose Limitation: Use investment data solely for the intended purpose and ensure no further processing without the knowledge and consent of the data subject, unless required by law.
d. Data Retention: Establish appropriate data retention periods considering legal, regulatory, and business requirements. Dispose of data in a secure manner after the retention period expires.
e. Data Access Restriction: Grant access to investment data on a need-to-know basis only. Implement access controls and data security measures to prevent unauthorized access and minimize the risk of data breaches.
f. Data Sharing: Do not share investment data with third parties unless required by applicable laws, regulations, or contractual obligations. Ensure appropriate agreements and safeguards are in place when sharing data externally.
g. Training and Awareness: Conduct regular training sessions to educate employees on data minimization practices, confidentiality obligations, and applicable data privacy laws.
h. Data Protection Impact Assessment (DPIA): Conduct DPIAs where necessary, considering the potential risks associated with the collection, processing, and storage of investment data.
i. Response to Data Subject Requests: Establish procedures to address data subject requests, including requests for access, rectification, erasure, or restriction of their investment data.
j. Incident Response: Develop an incident response plan to address data breaches, including reporting to relevant authorities and affected individuals, as required by applicable laws.
k. Supervision and Compliance: Appoint a data protection officer (DPO) or designate a responsible employee to monitor compliance with this policy and applicable data privacy laws.

4. Responsibilities
a. Management: Promote and enforce data minimization practices, ensuring compliance with applicable data privacy laws.
b. Employees: Adhere to this policy, receive necessary training, and report any potential breaches or non-compliance promptly.
c. Data Protection Officer: Oversee and ensure compliance with this policy, monitor changes in data privacy laws, conduct DPIAs, and address privacy-related inquiries.

5. Review and Updates
This policy shall be reviewed periodically to ensure compliance with evolving data privacy laws and changes in business practices. Updates to the policy shall be communicated to employees and relevant stakeholders.

By following this data minimization policy, we aim to protect the privacy and security of investment data, maintain compliance with applicable data privacy laws, and enhance trust with our clients and stakeholders.`
const DataMinimization = () => {
  return (
    <ScrollView >
      <Text style={{marginTop: 100, fontSize: 30, marginLeft: 'auto', marginRight: 'auto', marginBottom: 20, fontWeight: 'bold'}}>Data Minimization</Text>
      <View style={{marginBottom: 50}}>
      <Text style={styles.textContainer}>{text}</Text>

      </View>
      <View style={{height: 50}}></View>
    </ScrollView>
  )
}

export default DataMinimization

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center'
  },
  textContainer: {
    paddingHorizontal: 20,
    
  }
})