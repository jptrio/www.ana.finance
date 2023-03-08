import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import {
  Badge,
  Button,
  Checkbox,
  Code,
  ModalContent,
  Text,
} from '@chakra-ui/react'
import { DataSnapshot, push, query, ref, set } from '@firebase/database'
import { useEffect, useState } from 'react'
import { useDatabase, useDatabaseList, useDatabaseListData } from 'reactfire'
import { useAccount } from 'wagmi'

export default function UserAgreementModal() {
  const { address } = useAccount()

  const [isUaAcceptedLocal, setIsUaAcceptedLocal] = useState(true)
  const [isUaAcceptedDB, setIsUaAcceptedDB] = useState(true)

  const db = useDatabase()
  const accountsRef = ref(db, `accounts/${address}`)
  const accountsQuery = query(accountsRef)
  const { data, error, status } = useDatabaseList(accountsQuery)

  useEffect(() => {
    if (!data) return

    if (data && (data?.[1].snapshot as DataSnapshot).val()) {
      setIsUaAcceptedLocal(true)
      setIsUaAcceptedDB(true)
    } else {
      setIsUaAcceptedLocal(false)
      setIsUaAcceptedDB(false)
    }
  }, [data])

  const handleGetStarted = () => {
    if (!data) {
      const newAccount = push(accountsRef)
      set(newAccount, { isUaAccepted: true, id: address })
    } else {
      set(accountsRef, { isUaAccepted: true, id: address })
    }
  }

  return (
    <Modal
      size='xl'
      isOpen={!isUaAcceptedDB || false}
      isCentered={true}
      closeOnOverlayClick={false}
      onClose={() => alert('closed')}
    >
      <ModalOverlay backdropFilter='auto' backdropBlur='sm' />
      <ModalContent>
        <ModalHeader>Account Setup</ModalHeader>
        <ModalBody>
          <>
            {process.env.NEXT_PUBLIC_DEV_MODE && (
              <>
                <Badge colorScheme='red'>Dev Only</Badge>
                <Code width='100%' marginBottom='8'>
                  <pre>
                    {JSON.stringify(
                      {
                        address,
                        isUaAccepted: isUaAcceptedLocal,
                        error,
                        status,
                        data: {
                          id: data?.[0]?.snapshot,
                          isUaAccepted: data?.[1]?.snapshot,
                        },
                      },
                      null,
                      2
                    )}
                  </pre>
                </Code>
              </>
            )}
            <Checkbox
              size='lg'
              isChecked={isUaAcceptedLocal}
              onChange={() => setIsUaAcceptedLocal(!isUaAcceptedLocal)}
            >
              I have read, understand and agree to TREES N CLOUDS{' '}
              <a
                style={{ color: 'darkblue' }}
                href='https://treesnclouds.com/disclaimer'
              >
                Disclaimer
              </a>{' '}
              as well as the{' '}
              <a
                style={{ color: 'darkblue' }}
                href='https://treesnclouds.com/terms-of-service'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                style={{ color: 'darkblue' }}
                href='https://treesnclouds.com/privacy-policy'
              >
                Privacy Policy
              </a>
              .
            </Checkbox>
          </>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleGetStarted}
            colorScheme='orange'
            width='100%'
            isDisabled={!isUaAcceptedLocal}
          >
            Get Started
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
