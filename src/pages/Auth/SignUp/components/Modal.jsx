import React from 'react'
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps, useToast } from '@chakra-ui/react'
import { FirstStep } from './Steps/First'
import { SecondStep } from './Steps/Second'
import { useForm } from 'react-hook-form'
import { ThirdStep } from './Steps/Third'
import { useDispatch, useSelector } from 'react-redux'
import { signUpAction } from 'store/slices/auth'
import { STATUS } from 'store/statuses'
import { useNavigate } from 'react-router-dom'

const steps = [
  { title: 'Инфо' },
  { title: 'Аватар' },
  { title: 'Завершение' },
]

export const SignUpModal = ({
  onClose,
  isOpen,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
  } = useForm()

  const toast = useToast()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {
    signUpData,
    signUpStatus,
    signUpError,
  } = useSelector(s => s.Auth)

  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: steps.length,
  })

  const onSubmit = React.useCallback((data) => {
    if (!signUpData) return

    const body = {
      ...signUpData,
      ...data,
    }

    dispatch(signUpAction(body))
  }, [signUpData])

  React.useEffect(() => {
    if (signUpStatus === STATUS.FAILED) {
      toast({
        title: 'Ошибка при регистрации',
        description: signUpError,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })

      return
    }

    if (signUpStatus === STATUS.SUCCEEDED) {
      navigate('/auth/signin')

      return
    }
  }, [navigate, toast, signUpStatus, signUpError])

  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Завершение регистрации</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stepper size="lg" index={activeStep}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>

          <div className="my-3">
            {
              activeStep === 0 && <FirstStep register={register} />
            }

            {
              activeStep === 1 && <SecondStep register={register} />
            }

            {
              activeStep === 2 && <ThirdStep getValues={getValues} />
            }
          </div>
        </ModalBody>

        <ModalFooter>
          {
            activeStep > 0 && (
              <Button
                onClick={goToPrevious}
                className="mr-3"
                size="sm"
              >Назад</Button>
            )
          }

          <Button
            size="sm"
            colorScheme="whatsapp"
            isLoading={signUpStatus === STATUS.PENDING}
            onClick={
              activeStep === 2 ? handleSubmit(onSubmit) : goToNext
            }
          >
            {
              activeStep === 2 ? 'Завершить регистрацию' : 'Дальше'
            }
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}