import librosa
import librosa.display
import matplotlib.pyplot as plt

def plot_spectrogram(Y_SPECT,sr,hop_length, BER_AUDIO, audfile_name, fig_name):

    frames = range(len(BER_AUDIO))
    t = librosa.frames_to_time(frames, hop_length=hop_length, sr=sr)
    
    #Plotting Log-Freq Spectrogram, Band Energy Ratio Fetures as two sub plots
    plt.figure(figsize=(25, 15))
    plt.rcParams.update({'font.size': 22})
    
    plt.subplot(2,1,1)
    librosa.display.specshow(Y_SPECT, 
                             sr=sr,
                             hop_length = hop_length,
                             x_axis = 's',
                             y_axis = 'log')
    plt.colorbar(format="%+2.f")
    plt.title(audfile_name + '_' + fig_name[0])
    plt.ylabel('Frequency in Hz')
    
    plt.subplot(2,1,2)
    plt.plot(t, BER_AUDIO, color="red",linewidth = 4)
                             
                             
    plt.title(audfile_name + '_' + fig_name[1])
    plt.xlabel('Time in seconds')                         
    plt.ylabel('Band Energy Ratio values')
    #plt.ylim((0, 20000))
                             
    plt.tight_layout()
    plt.savefig(audfile_name + '_' + 'Band Energy Ratio.jpg')
    plt.show()