import matplotlib.pyplot as plt
import librosa
import librosa.display
import numpy as np
import os

#sampidx---Starting index of the sample for the plot Default value is 0
#NSAMPLES---Number of samples to display Default value is 1000
def PLOTSPECTRUM (input_audio,sampling_rate,frequency,magnitude,phase,audfile_name,FIG_NAME, output_path,uniqueIdentifier,sampidx = 0, NSAMPLES = 1000):
    
    plt.figure(figsize=(22,12))
    
    ax = plt.subplot(3, 1, 1)
    librosa.display.waveshow(input_audio, sr=sampling_rate, alpha=0.5,label='Audio Waveform',color = 'lime')
    plt.ylim((-1, 1))
    plt.title(audfile_name)
    plt.ylabel('Amplitude')
    plt.legend()
       
    plt.subplot(3, 1, 2)
    plt.plot(frequency[sampidx:sampidx+NSAMPLES], magnitude[sampidx:sampidx+NSAMPLES],label=FIG_NAME[0],color='orange') 
                                                                                                              # magnitude spectrum
    plt.xlabel("Frequency (Hz)")
    plt.ylabel("Magnitude")
    plt.title('Magnitude Spectrum')
    plt.legend()
    
    plt.subplot(3, 1, 3)
    plt.plot(frequency[sampidx:sampidx+NSAMPLES], phase[sampidx:sampidx+NSAMPLES],label=FIG_NAME[1]) # phase spectrum
    plt.ylim(-200,200)

    steps = np.arange(-180,210,30)
    plt.yticks(steps)
    plt.xlabel("Frequency (Hz)")
    plt.ylabel("Phase in degrees")
    plt.title('Phase Spectrum')
    plt.legend()
    
    plt.tight_layout()
    plt.savefig(os.path.join(output_path, f'{uniqueIdentifier}_exp3.png'))
    
    #plt.show()
    plt.close()
    
